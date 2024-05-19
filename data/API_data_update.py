import requests
import json
import pandas as pd
from datetime import date
import numpy as np
import os

def BONBEON_BUBEON_preprocessing(value):
    if pd.isnull(value) == False and not(str(value).replace('.','').isdigit()):
        return np.nan
    else:
        return value

def BLDG_NM_preprocessing(building_name):
    building_name = str(building_name)
    if '/' in building_name:
        return building_name.split('/')[0]
    elif '-' in building_name:
        name_list = building_name.split('/')
        if len(name_list)==2 and str(name_list[0]).isdigit() and str(name_list[1]).isdigit():
            return np.nan
    else:
        return building_name


def API_data_update():
    api_key = '6a4f6575757039363834685968426e'

    url = 'http://openapi.seoul.go.kr:8088/{0}/json/tbLnOpendataRtmsV/{1}/{2}/'.format(api_key, 1, 100)

    response = requests.get(url)
    data = json.loads(response.text)
    data_df = pd.DataFrame(data['tbLnOpendataRtmsV']['row'])

    data_df['DEAL_YMD'] = data_df['DEAL_YMD'].astype(str)
    data_df['DEAL_YMD'] = pd.to_datetime(data_df['DEAL_YMD'], format='%Y-%m-%d')

    # 오늘의 날짜
    today = pd.to_datetime(date.today())
    today_formatted = today.strftime("%Y%m%d")
    DATA_DIR = './data/API/'

    # 현재까지 갱신한 API 파일 중 가장 최근 파일의 날짜 가져오기
    file_list = os.listdir(DATA_DIR)
    file_list.sort()
    latest_date = pd.to_datetime(file_list[-1][9:17])

    # 마지막으로 업데이트한 파일 이후, 현재까지의 데이터 가져오기
    update_df = data_df[(latest_date < data_df['DEAL_YMD']) & (data_df['DEAL_YMD'] <= today)]
    update_df = update_df.replace('', np.nan)

    # 최신 파일 가져오기
    df = pd.read_csv(DATA_DIR + file_list[-1])

    # 추가된 데이터가 없을 경우
    if len(update_df) == 0:
        df.to_csv(DATA_DIR + 'API_data_{}.csv'.format(today_formatted), index=False)
    else:
        # 취소일이 있는 데이터의 경우 삭제
        update_df = update_df.drop(update_df[~update_df['CNTL_YMD'].isna()].index)
        update_df = update_df.reset_index(drop=True)

        # B ONBEON과 BUBEON 데이터에서 nan값 또는 숫자가 아닌 경우 nan으로 변경
        update_df['BONBEON'] = update_df['BONBEON'].apply(BONBEON_BUBEON_preprocessing)
        update_df['BUBEON'] = update_df['BUBEON'].apply(BONBEON_BUBEON_preprocessing)

        # 건물명 전처리
        update_df['BLDG_NM'] = update_df['BLDG_NM'].str.replace(r'\([^)]*\)', '', regex=True)
        update_df['BLDG_NM'] = update_df['BLDG_NM'].str.replace(r'\s+', '', regex=True)
        update_df['BLDG_NM'] = update_df['BLDG_NM'].str.replace('(', '', regex=False)
        update_df['BLDG_NM'] = update_df['BLDG_NM'].replace('', np.nan)
        update_df['BLDG_NM'] = update_df['BLDG_NM'].apply(lambda x: str(x).replace(' ', ''))

        update_df['BLDG_NM'] = update_df['BLDG_NM'].apply(BLDG_NM_preprocessing)
        update_df = update_df.replace({None: np.nan, 'nan': np.nan})

        update_df = update_df[
            ['SGG_NM', 'BJDONG_NM', 'BONBEON', 'BUBEON', 'BLDG_NM', 'DEAL_YMD', 'OBJ_AMT', 'BLDG_AREA', 'TOT_AREA',
             'FLOOR', 'HOUSE_TYPE']]
        update_df['DEAL_YMD'] = update_df['DEAL_YMD'].astype(str)

        result = pd.concat([df, update_df], ignore_index=True)
        result.to_csv(DATA_DIR + 'API_data_{}.csv'.format(today_formatted), index=False)

    file_list = os.listdir(DATA_DIR)
    file_list.sort(reverse=True)

    if len(file_list) > 5:
        delete_file = file_list[5:]

        for file in delete_file:
            os.remove(DATA_DIR + file)


if __name__ == "__main__":
    API_data_update()
import requests
import json
import pandas as pd
from tqdm import tqdm
import warnings, time

warnings.filterwarnings(action='ignore')
# 파이썬에서 불필요한 warning은 안뜨게 함

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException

from bs4 import BeautifulSoup
import re

import urllib.request

from multiprocessing import Pool

options = webdriver.ChromeOptions()
options.add_argument("--ignore-local-proxy")

# 서울시의 시/군/구 리스트를 가져오는 함수
def get_gungu_info(sido_code):
    down_url = 'https://new.land.naver.com/api/regions/list?cortarNo=' + sido_code
    r = requests.get(down_url, data={"sameAddressGroup": "false"}, headers={
        "Accept-Encoding": "gzip",
        "Host": "new.land.naver.com",
        "Referer": "https://new.land.naver.com/complexes?ms=37.478448,127.0506355,17&a=APT:PRE&b=A1&e=RETAIL",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
    })
    r.encoding = "utf-8-sig"
    temp = json.loads(r.text)
    temp_df = pd.DataFrame(temp['regionList'])

    return temp_df[['cortarNo', 'cortarName']]

# 각 시/군/구 별 동 리스트를 가져오는 함수
def get_dong_info(gungu_code):
    down_url = 'https://new.land.naver.com/api/regions/list?cortarNo='+gungu_code
    r = requests.get(down_url,data={"sameAddressGroup":"false"},headers={
        "Accept-Encoding": "gzip",
        "Host": "new.land.naver.com",
        "Referer": "https://new.land.naver.com/complexes?ms=37.488344,127.04512050000001,17&a=PRE:APT&b=A1&e=RETAIL",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
    })
    r.encoding = "utf-8-sig"
    temp=json.loads(r.text)
    temp_df = pd.DataFrame(temp['regionList'])
    #temp=list(pd.DataFrame(temp['regionList'])["cortarNo"])
    return temp_df[['cortarNo','cortarName','centerLat','centerLon']]

# 동 별 아파트의 리스트를 가져오는 함수
def get_apt_list(dong_code):
    down_url = 'https://new.land.naver.com/api/regions/complexes?cortarNo=' + dong_code + '&realEstateType=APT%3APRE&order='
    r = requests.get(down_url, data={"sameAddressGroup": "false"}, headers={
        "Accept-Encoding": "gzip",
        "Host": "new.land.naver.com",
        "Referer": "https://new.land.naver.com/complexes/102378?ms=37.5018495,127.0438028,16&a=APT&b=A1&e=RETAIL",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
    })
    r.encoding = "utf-8-sig"
    temp = json.loads(r.text)
    temp_df = pd.DataFrame(temp['complexList'])

    # 데이터가 없을 경우 빈 리스트 리턴
    if len(temp_df) == 0:
        return temp_df

    return temp_df['complexNo']

# 크롤링
# 크롤링
def crawling(url,pre_gu_cortarName,dong_cortarName,dong_centerLat,dong_centerLon):
    total_df = pd.DataFrame()
    estate_df = pd.DataFrame()
    estate_code = 0
    try:
        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
    except:
        driver = webdriver.Chrome()

    driver.get(url)
    try:
    # 매물 유무 확인
        Full_Xpath = '/html/body/div[2]/div/section/div[2]/div[1]/div/div[2]/div[2]'
        element = driver.find_element("xpath", Full_Xpath)
        time.sleep(2)
    
        if element.text == '해당되는 매물이 없습니다.' or element.text == '':
            print('매물 없음')
            print(total_df)
        else:
            print('매물 있음')
            print('단지 정보 가져오기')
            # 단지 정보 가져오기
            estate_button_xpath = '/html/body/div[2]/div/section/div[2]/div[1]/div/div[2]/div[1]/div[1]/div[2]/div[2]/button[1]'
            estate_elem = driver.find_element('xpath', estate_button_xpath)
            estate_elem.click()
            time.sleep(2)
    
            estate_dict = {}
            estate_dict['estate_code'] = estate_code
            # 단지 이름
            estate_name_xpath = '/html/body/div[2]/div/section/div[2]/div[1]/div/div[2]/div[1]/div[1]/div[1]/h3'
    
            estate_dict['estate_name'] = driver.find_element('xpath', estate_name_xpath).text
    
            # 단지 정보 가져오기
            estate_tr_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr'
            
            # 단지 정보 개수
            estate_tr_elements = driver.find_elements('xpath', estate_tr_xpath)
            estate_tr_len = len(estate_tr_elements)
    
            for estate_tr_row in range(1, estate_tr_len + 1):
                estate_th_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr[{0}]/th'.format(
                    estate_tr_row)
                estate_th_elements = driver.find_elements('xpath', estate_th_xpath)
                estate_th_len = len(estate_th_elements)
                if estate_th_len == 1:
                    estate_th_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr[{0}]/th'.format(
                        estate_tr_row)
                    estate_td_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr[{0}]/td'.format(
                        estate_tr_row)
                    estate_th = driver.find_element('xpath', estate_th_xpath).text
                    estate_td = driver.find_element('xpath', estate_td_xpath).text
                    estate_dict[estate_th] = estate_td
                else:
                    for pre_th_len in range(1, estate_th_len + 1):
                        estate_th_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr[{0}]/th[{1}]'.format(
                            estate_tr_row, pre_th_len)
                        estate_td_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr[{0}]/td[{1}]'.format(
                            estate_tr_row, pre_th_len)
                        estate_th = driver.find_element('xpath', estate_th_xpath).text
                        estate_td = driver.find_element('xpath', estate_td_xpath).text
                        estate_dict[estate_th] = estate_td
            # DataFrame에 매물정보 저장
            estate_temp_df = pd.DataFrame([estate_dict])
            estate_df = pd.concat([estate_df, estate_temp_df], ignore_index=True)
            print('단지 정보 가져오기 끝')
    
            # 매물 클릭하기 전 탭 개수
            tab_cnt = len(driver.window_handles)
    
            for i in range(1, 50):
                Full_Xpath = '/html/body/div[2]/div/section/div[2]/div[1]/div/div[2]/div[2]/div/div/div[{0}]/div'.format(i)
                elements = driver.find_elements('xpath', Full_Xpath)
                time.sleep(2)
    
                if len(elements) > 0:
                    try:
                        elem = driver.find_element('xpath', Full_Xpath)
                        driver.execute_script("arguments[0].scrollIntoView();", elem)
                        # 매물 클릭
                        elem.click()
                    except StaleElementReferenceException:
                        elem = driver.find_element('xpath', Full_Xpath)
                        driver.execute_script("arguments[0].scrollIntoView();", elem)
                        # 매물 클릭
                        elem.click()
                    except Exception:
                        continue
    
                    time.sleep(2)
                    building_dict = dict()
    
                    # 단지 정보와 이어줄 단지 code 추가
                    building_dict['estate_code'] = estate_code
    
                    # 매물 클릭한 후 탭 개수
                    click_tab_cnt = len(driver.window_handles)
    
                    # 클릭 후 새로운 탭이 열렸을 때
                    if tab_cnt < click_tab_cnt:
                        time.sleep(4)
                        driver.switch_to.window(driver.window_handles[1])
                        driver.close()
                        driver.switch_to.window(driver.window_handles[0])
                        # i 번째에 있는 매물의 '네이버에서 보기' 버튼 누르기
                        try:
                            full_xpath = '/html/body/div[2]/div/section/div[2]/div[1]/div/div[2]/div[2]/div/div/div[{0}]/div/div[2]/a'.format(
                                i)
                            elem = driver.find_element('xpath', full_xpath)
                            elem.click()
                        except StaleElementReferenceException:
                            full_xpath = '/html/body/div[2]/div/section/div[2]/div[1]/div/div[2]/div[2]/div/div/div[{0}]/div/div[2]/a'.format(
                                i)
                            elem = driver.find_element('xpath', full_xpath)
                            elem.click()
                        except Exception:
                            continue
    
                    print('건물 정보 가져오기 시작')
    
                    # 건물의 사진이 없는 경우
                    try:
                        # 매물정보 탭에서 매물정보의 개수 구하기
                        # tbody 내부의 tr 요소들을 가져오기 위한 full XPath
                        tr_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[2]/div[1]/table/tbody/tr'
    
                        # tr 요소들을 찾아오기
                        tr_elements = driver.find_elements('xpath', tr_xpath)
                        # tr 요소의 개수 출력
                        tr_len = len(tr_elements)
    
                        for tr_row in range(1, tr_len + 1):
                            th_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[2]/div[1]/table/tbody/tr[{0}]/th'.format(
                                tr_row)
                            th_elements = driver.find_elements('xpath', th_xpath)
                            th_len = len(th_elements)
                            if th_len == 1:
                                th_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[2]/div[1]/table/tbody/tr[{0}]/th'.format(
                                    tr_row)
                                td_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[2]/div[1]/table/tbody/tr[{0}]/td'.format(
                                    tr_row)
                                th = driver.find_element('xpath', th_xpath).text
                                td = driver.find_element('xpath', td_xpath).text
                                building_dict[th] = td
                            else:
                                for pre_th_row in range(1, th_len + 1):
                                    th_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[2]/div[1]/table/tbody/tr[{0}]/th[{1}]'.format(
                                        tr_row, pre_th_row)
                                    td_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[2]/div[1]/table/tbody/tr[{0}]/td[{1}]'.format(
                                        tr_row, pre_th_row)
                                    th = driver.find_element('xpath', th_xpath).text
                                    td = driver.find_element('xpath', td_xpath).text
                                    building_dict[th] = td
    
                        # 건물명과 가격 가져오기
                        building_name_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[1]/div[1]/div[2]/h4/strong'
                        building_price_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[1]/div[1]/div[3]/span[2]'
                        building_dict['building_name'] = driver.find_element('xpath', building_name_xpath).text
                        building_dict['price'] = driver.find_element('xpath', building_price_xpath).text
    
                        # 구, 동에 대한 정보 추가
                        building_dict['gu'] = pre_gu_cortarName
                        building_dict['dong'] = dong_cortarName
                        building_dict['latitude'] = dong_centerLat
                        building_dict['longitude'] = dong_centerLon
                        building_dict['house_type'] = '아파트'
                        #print('building_dict:', building_dict)
                        # DataFrame에 매물정보 저장
                        temp_df = pd.DataFrame([building_dict])
                        print('건물 사진 없음')
    
                    # 건물의 사진이 있는 경우
                    except NoSuchElementException:
                        print('건물 사진 있음')
                        
                        # 매물정보 탭에서 매물정보의 개수 구하기
                        # tbody 내부의 tr 요소들을 가져오기 위한 full XPath
                        tr_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr'
    
                        # tr 요소들을 찾아오기
                        tr_elements = driver.find_elements('xpath', tr_xpath)
                        # tr 요소의 개수 출력
                        tr_len = len(tr_elements)
    
                        for tr_row in range(1, tr_len + 1):
                            th_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr[{0}]/th'.format(
                                tr_row)
                            th_elements = driver.find_elements('xpath', th_xpath)
                            th_len = len(th_elements)
                            if th_len == 1:
                                th_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr[{0}]/th'.format(
                                    tr_row)
                                td_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr[{0}]/td'.format(
                                    tr_row)
                                th = driver.find_element('xpath', th_xpath).text
                                td = driver.find_element('xpath', td_xpath).text
                                building_dict[th] = td
                                
                                if th == '매물번호':
                                    atclNo = td
                            else:
                                for th_row in range(1, th_len + 1):
                                    th_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr[{0}]/th[{1}]'.format(
                                        tr_row, th_row)
                                    td_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/table/tbody/tr[{0}]/td[{1}]'.format(
                                        tr_row, th_row)
                                    th = driver.find_element('xpath', th_xpath).text
                                    td = driver.find_element('xpath', td_xpath).text
                                    building_dict[th] = td
                                    
                                    if th == '매물번호':
                                        atclNo = td

                        # 이미지 저장                
                        print('이미지 가져오기 시작')
                        print('atclNo:',atclNo)
                        image_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[1]/div/a[1]'
                        elem = driver.find_element('xpath', image_xpath)
                        elem.click()
                        
                        time.sleep(3)
                        driver.switch_to.window(driver.window_handles[-1])
                        
                        image_list = []
                        atclNo = str(atclNo)
                        image_dest = 'C:/workspace/pyp/data/data/APT/image/'
                        
                        soup = BeautifulSoup(driver.page_source, 'html.parser')
                        pic_num_size = soup.find('span', class_='p_num _js_total_size_area').text
                        pic_num_list = re.split('[/()]',pic_num_size)
                        end = int(pic_num_list[2])
                        
                        image_tag_list = soup.find_all('img')
                        image_url_list = []
                        
                        for img_tag in image_tag_list:
                            tmp_src = img_tag.get('src')
                            tmp_src_list = tmp_src.split('?type=')
                            src = tmp_src_list[0] + '?type=m1024'
                            image_url_list.append(src)
                        
                        floor_plan_url = image_url_list[2]
                        floor_plan_img_name = atclNo+'_'+'floor_plan'+'.jpg'
                        urllib.request.urlretrieve(floor_plan_url,image_dest+floor_plan_img_name)
                        image_list.append(floor_plan_img_name)
                        
                        for index, url in enumerate(image_url_list[3:end]):
                            img_name = atclNo+'_'+str(index+1)+'.jpg'
                            urllib.request.urlretrieve(url,image_dest+img_name)
                            image_list.append(img_name)
                        
                        building_dict['img_name'] = image_list
                        
                        driver.close()
                        driver.switch_to.window(driver.window_handles[0])
                        print('이미지 가져오기 끝')
    
                        # 건물명과 가격 가져오기
                        building_name_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[2]/div[1]/div[2]/h4/strong'
                        building_price_xpath = '/html/body/div[2]/div/section/div[2]/div[2]/div/div[2]/div[2]/div[1]/div[3]/span[2]'
                        building_dict['building_name'] = driver.find_element('xpath', building_name_xpath).text
                        building_dict['price'] = driver.find_element('xpath', building_price_xpath).text
    
                        # 단지 정보와 이어줄 단지 code 추가
                        building_dict['estate_code'] = estate_code
    
                        # 구, 동에 대한 정보 추가
                        building_dict['gu'] = pre_gu_cortarName
                        building_dict['dong'] = dong_cortarName
                        building_dict['latitude'] = dong_centerLat
                        building_dict['longitude'] = dong_centerLon
                        building_dict['house_type'] = '아파트'
                        
                        # DataFrame에 매물정보 저장
                        temp_df = pd.DataFrame([building_dict])
                    except Exception:
                        temp_df = pd.DataFrame()
    
                    total_df = pd.concat([total_df, temp_df], ignore_index=True)
                    print('건물 정보 가져오기 끝')
                    print(total_df.iloc[-1]['building_name'])
                    print(total_df)
                else:
                    break
            # 단지 정보와 각 데이터를 연결 시켜줄 code 번호
            estate_code += 1
            time.sleep(3)
    except Exception:
        print('except')
    
    driver.quit()
    return (total_df, estate_df)

if __name__ == "__main__":
    gungu_result = get_gungu_info('1100000000')
    gu_cortarNo = gungu_result['cortarNo']
    gu_cortarName = gungu_result['cortarName']

    for i in tqdm(range(len(gungu_result))):
        dong_result = get_dong_info(gu_cortarNo[i])
        dong_cortarNo = dong_result['cortarNo']
        dong_cortarName = dong_result['cortarName']
        dong_centerLat = dong_result['centerLat']
        dong_centerLon = dong_result['centerLon']
        pre_gu_cortarName = gu_cortarName[i]

        for j in range(len(dong_result)):
            # 각 동에 속하는 아파트의 complexNo 리스트 리턴
            complexNo_list = get_apt_list(dong_cortarNo[j])
            info_list = []

            # 각 동에 아파트가 없을 경우 패스
            if len(complexNo_list) == 0:
                continue

            for complexNo in complexNo_list:
                temp_url = 'https://new.land.naver.com/complexes/{0}?ms={1},{2},17&a=PRE:APT&b=A1&e=RETAIL'.format(
                    complexNo, dong_centerLat[j], dong_centerLon[j])
                info_list.append(
                    (temp_url, pre_gu_cortarName, dong_cortarName[j], dong_centerLat[j], dong_centerLon[j]))

            # 프로세스 풀 생성
            with Pool(processes=5) as pool:  # 원하는 프로세스 수로 조절
                results, estate_results = zip(*pool.starmap(crawling, info_list))

            result_df = pd.concat(results, ignore_index=True)
            estate = pd.concat(estate_results, ignore_index=True)

            result_df.to_csv('./data/APT/naver_selenium_APT_multi({0}_{1}).csv'.format(gu_cortarName[i], dong_cortarName[j]))
            estate.to_csv('./data/APT/naver_selenium_APT_estate_multi({0}_{1}).csv'.format(gu_cortarName[i], dong_cortarName[j]))
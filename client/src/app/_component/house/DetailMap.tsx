import { useEffect } from 'react';

const { kakao } = window;

export default function DetailMap({ center }: { center: string }) {
    useEffect(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 1, // 지도의 확대 레벨
        };

        const map = new kakao.maps.Map(mapContainer, mapOption);

        let geocoder = new kakao.maps.services.Geocoder();

        let callback = function (result: any, status: any) {
            if (status === kakao.maps.services.Status.OK) {
                let x = result[0].x;
                let y = result[0].y;

                map.setCenter(new kakao.maps.LatLng(y, x));

                var markerPosition = new kakao.maps.LatLng(y, x);

                var marker = new kakao.maps.Marker({
                    position: markerPosition,
                });

                marker.setMap(map);
            }
        };

        geocoder.addressSearch(center, callback);
    }, [center]);

    return (
        <div className="w-full">
            <div
                id="map"
                className="w-full h-[540px] bg-[#F4F6F5] flex justify-center items-center"
            ></div>
        </div>
    );
}

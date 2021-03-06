# Covid 19 Tracker
## 목적
전 세계의 코로나 감염 현황을 보여주기 위해 개발된 웹 페이지이며, React와 Firbase를 사용하여 제작되었다.

https://disease.sh 의 오픈 데이터 API를 사용하여 각 나라 별 감염 현황에 대한 데이터를 받아왔으며, 확진자, 격리해제 그리고 사망자 별로 분류하였고, react-leaflet 을 사용해 세계 지도로 전체적인 감염 현황을 한 눈에 볼 수 있게 개발되었다.

또한 측면 데이터는 차트와 표로 나라 별 총 확진자의 수치를 나타내주며, 약간의 반응형 웹을 적용하였다.


- **기간** :
07.13 ~ 07.15

- **개발인원** :
1 명

- **페이지 구성 (flow chart)** (진행중)
<img src="https://user-images.githubusercontent.com/56250064/127616772-45dc9eec-a27e-4ad3-b130-cb2db8b80fec.png" width="50%" height="50%" >




## 사용기술
1. React
2. @material-ui/core
3. react-leaflet (Map)
4. leaflet (Map)
5. react-chartjs-2 (Graph)
6. chart.js (Graph)
7. numeral 

## 상세 페이지 (진행 중)
### - 메인 페이지 (App.js)
![Covid_Main](https://user-images.githubusercontent.com/56250064/127606464-68fb6f4a-3d15-4d9d-8b48-b5d812b96c17.png)
</hr>

1. 기능
- Header : 국가 선택 ( 디폴트 값은 world-wide ).
- Stat : 확진자 / 격리해제 / 사망자로 구분, 선택 시 지도에서 원으로 표시.
- Map : 확대/축소 가능, 나라 선택 시 나라 상세 감염 현황 정보를 팝업 형태로 표시.
> 에러) 두 나라의 원이 겹칠 시 큰 원에 해당되는 나라의 정보만을 표시한다. (수정 필요)
- Sidebar : 나라 별  총 감염자를 표로 표시 및 Stat 버튼 선택에 따른 날짜 별 신규 감염자 / 격리해제 / 사망자를 그래프로 표시.

2. 

# CH9. 계층형 설계 2

## 추상화 벽

- 인터페이스만 제공 된 형태의 함수와, 실제 실행 코드 간의 분리가 되는 기점
- 코드를 몰라도 인터페이스가 제공 된 함수를 활용하여 원하는 기능 만들기 가능
- 라이브러리 | API와 유사
- 추상화 벽을 가로 지르는 액션이 발생하지 않아야 함 >> 같은 추상화 벽 레벨의 함수 사용 불가능
- JS와 어셈블리의 구조가 추상화 벽을 설명 >> JS는 알지만 어셈블리를 몰라도 코딩이 가능한 것 처럼!

## 작은 인터페이스

- 새로운 기능 개발 시, 기존의 하위 기능을 이용해 상위에 만드는 방법
- 실제 개발에 필요한 지식 없이, 기존의 추상화 벽에 존재하는 함수로 기능 개발이 가능
- 특정 기능 개발을 할 때, 계산 함수에 액션이 들어가서는 안됨 >> 해당 계산을 사용하는 모든 함수에 액션이 퍼지기 때문
- 액션이 들어가도 괜찮은 추상화 벽에 존재하는 액션 함수에서 잘 찾아 볼 것

## 편리한 계층

- 추상화 벽을 완전히 완벽하게 쌓아 올리는 것은 쉽지 않다
- 비지니스 요구사항과 코드의 효율, 필요성을 모두 만족하는 것을 설계해야 하기 때문
- 고품질의 SW 개발을 위해서 계층을 나누는데 시간 할애가 필요

### 기능적 요구사항 vs 비기능적 요구사항

- 기능적 요구사항
  - SW가 해야할 일
- 비기능적 요구사항
  - 유지보수성 : 요구사항이 변경 되었을 때, 제일 쉽게 변경이 가능한 코드 > 최상단의 코드, 위로 연결이 적은 코드
  - 테스트성 : 테스트를 했을 때, 가장 얻는 것이 많은 코드(중요성) > 최하단의 코드, 위쪽으로 많이 연결 된 코드
  - 재사용성 : 재사용하기 좋은 코드 & 함수 > 최하단의 코드, 아래로 연결이 적은 코드
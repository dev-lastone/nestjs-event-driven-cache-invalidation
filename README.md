# Event-driven Cache Invalidation (이벤트 기반 캐시 무효화)

마이크로서비스 구성이 아닌 기존 API 서버에 kafka를 추가하여, 메세지 전송/구독/감지 테스트 위함.

변경이 잦지 않지만, 조회는 자주 이루어지는 메타 데이터 캐싱

- 데이터베이스 부하 감소
- 응답 속도 향상
- 실시간 데이터 갱신 가능

admin -> kafka -> app

## Installation

```bash
$ pnpm install

$ docker-compose up -d
```

## Running the app

```bash
$ nest build

$ pm2 start ecosystem.config.js
```

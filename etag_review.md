
# etag와 304 그 진실을 향해서

## 진실 한줄 요약
> cache-control max-age를 설정한 static resource의 응답 헤더 etag는 무조건 삭제해야하는 헤더가 아니다.
> 상황에 따라 삭제하지 않아도 된다.

## 조건 부 요청 시나리오
1. 리소스 'A' 의 응답 헤더에 다음 헤더 설정
   - etag or last-modified
2. 브라우저가 리소스 'A'를 요청하려할 때
   - cache-control의 max-age의 시간 초과 하지 않았다면
     - disk cache에서 리소스 'A'를 로드한다.
   - cache-control의 max-age의 시간 초과 하였다면
     - 요청 헤더에 다음 조건 부 헤더 설정 후 요청
       - [If-None-Match: {etag}](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match)
       - [If-Modified-Since: {last-modified}](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/If-Modified-Since)
     - 서버에서 리소스 'A'에 대한 자원이 변경되었는지 조건 부 헤더의 값을 기준으로 검사
       - 변경되었다면 200 응답 + 새로운 자원 payload 전송
       - 변경되지 않았다면 304 응답 + no payload
         - 브라우저는 304인 경우 이전의 로컬 캐시 자원을 사용

## 정리
- 조건 부 헤더 요청은 max-age에 설정된 시간 이후에 발생하는 요청
  - 불필요한 네트워크 레이턴시를 줄이는 목적 관련
    - etag를 무조건 삭제하지 않아도 max-age가 충분히 길고(1년) 리소스 변경 주기가 그 보다 짧으면(1달, 2달) 조건부 헤더 요청은 발생하지 않는다.
- Next.js 동작
  - static resource의 응답 헤더
    - etag 강제 설정 (커스터마이징 불가능)
      - html page의 etag 활성/비활성 설정은 제공
        - [generateEtags config](https://nextjs.org/docs/api-reference/next.config.js/disabling-etag-generation)
    - cache-control 강제 설정
      - [public, max-age=31536000, immutable](https://github.com/vercel/next.js/blob/canary/packages/next/server/next-server.ts#L611)
        - [확장 헤더 immutable](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Cache-Control)는 새로운 [RFC 8246][https://datatracker.ietf.org/doc/html/rfc8246]
        - 아직 구현한 브라우저가 많지 않지만 etag의 유무와 상관없이 캐시된 자원의 조건부 헤더 요청을 비활성화 하는 설정

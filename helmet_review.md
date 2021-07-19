# helmet review

## AS-IS vs TO-BE
### AS-IS (express default 설정)

#### response header

```
Connection: keep-alive
Keep-Alive: timeout=5
Date: Mon, 19 Jul 2021 14:51:43 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 5
ETag: W/"5-qvTGHdzF6KLavt4PO0gs2a6pQ00"
X-Powered-By: Express
```

### TO-BE (helmet default 설정)
#### response header
```
Connection: keep-alive
Keep-Alive: timeout=5
Date: Mon, 19 Jul 2021 14:50:52 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 5
ETag: W/"5-qvTGHdzF6KLavt4PO0gs2a6pQ00"
X-DNS-Prefetch-Control: off
Expect-CT: max-age=0
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: no-referrer
X-XSS-Protection: 0
Content-Security-Policy: default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src data: 'self' data:;object-src 'none';script-src 'unsafe-eval' 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
```

## helmet이 설정하는 보안 관련 헤더들
### 기본 동작 설명 (default enabled)

- 추가
    - [Content-Security-Policy](https://developers.google.com/web/fundamentals/security/csp?hl=ko)
        - 주어진 페이지에 대해 유저 에이전트가 로드할 수 있는 리소스를 제어합니다.
        - 기본값 : self rule을 기본으로 하는 policy 적용 (위 TO-BE 참고)
    - [X-DNS-Prefetch-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control)
        - 브라우저가 이미지, CSS, JavaScript 등을 포함하여 문서에 의해 참조된 항목을 위한 URL뿐만 아니라 사용자가 따르길 선택한 링크 모두에서 사전에 수행할 도메인 네임 확인을 수행하는 기능인 DNS 프리페칭을 제어합니다.
        - 기본값 : off
    - [Expect-CT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT)
        - 사이트가 잘못 발급된 인증서의 사용이 눈에 띄지 않게 넘어가는것을 방지해주는 인증서 투명성(Certificate Transparency) 요구 보고 및/또는 시행을 옵트인할 수 있게 해줍니다. 사이트가 Expect-CT 헤더를 사용할 때, 사이트는 공개 CT 로그에 나타난 사이트에 대한 모든 인증서를 Chrome이 확인하도록 요청합니다.
        - Chrome 67부터 지원하기 시작
        - 기본값 : max-age=0
    - [X-Frame-Options](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/X-Frame-Options)
        - 브라우저가 `<frame>, <iframe>, <embed>` 또는 `<object>`에서 페이지 렌더링을 허용해야하는지를 나타냅니다.
            - Clickjacking 방지
        - 기본값 : SAMEORIGIN
    - [Strict-Transport-Security](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Strict-Transport-Security)
        - HTTP 대신 HTTPS를 사용하여 통신하도록 강제합니다.
        - 기본값 : max-age=15552000; includeSubDomains
    - [X-Download-Options](https://www.google.com/search?q=X-Download-Options)
        - 브라우저(인터넷 익스플로러)가 파일을 통한 피싱 공격을 방지하기 위해 애플리케이션으로부터 다운로드된 파일에 "열기" 옵션을 표시하면 안되는지 여부를 나타냅니다. 피싱 공격을 방지하지 못할 경우 파일을 애플리케이션의 컨텍스트에서 실행할 권한을 얻게됩니다.
        - 기본값 : noopen
    - [X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
        - MIME 스니핑을 비활성화하고 브라우저가 Content-Type에 주어진 타입을 사용하도록 강제합니다.
        - 기본값 : nosniff
    - [X-Permitted-Cross-Domain-Policies](https://www.google.com/search?q=X-Permitted-Cross-Domain-Policies)
        - 교차-도메인 정책 파일(XML)이 허용되었는지를 명시합니다. 해당 파일은 Adobe Flash Player 또는 Adobe Acrobat(예, PDF)과 같은 웹 클라이언트가 도메인을 넘어 데이터를 다룰 수 있도록 허용하는 정책을 정의할수도 있습니다.
        - 기본값 : none
    - [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
        - 생성된 요청이 Referer 헤더에서 전송된 referrer 정보에 포함되어야하는지를 관리합니다.
        - 기본값 : no-referrer
    - [X-XSS-Protection](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/X-XSS-Protection)
        - 기본값 : 교차-사이트 스크립팅 필터링을 활성화합니다.
- 삭제
    - X-Powered-By
        - 호스팅 환경 또는 프레임워크에 의해 설정, 잠재적 취약점 노출을 제거하기 위해 삭제 필요


## 참고
- https://developer.mozilla.org/ko/docs/Web/HTTP/Headers

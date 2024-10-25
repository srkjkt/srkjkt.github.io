git config --unset user.name
git config --unset user.email

git config --local user.name "srkjkt"
git config --local user.email "srkim.jakarta@gmail.com"

git remote -v
그게 현재 로컬 저장소가 바라보는 원격 저장소의 url인데 이걸 바꾸려면 다음의 명령어로 바꿀 수 있다.

git remote set-url origin https://github.com/youngjinmo/youngjinmo.github.io.git
저장소를 처음만들고, 원격 저장소에 지정할 때의 명령어는 아래와 같다. 아직 지정해둔 원격 저장소가 없을 때엔 remote와 origin 사이에 add를, 지정해둔 원격 저장소 주소를 바꾸고 싶을 땐 set-url을 붙이는 차이가 있다.

git remote add origin https://github.com/youngjinmo/youngjinmo.github.io.git
그리고 변경사항을 푸쉬하면 제대로 이동되었음을 확인할 수 있다.

git push -u origin master

git config --system --unset credential.helper
git config --global --unset credential.helper

git remote -v
git remote set-url origin https://github.com/srkjkt/srkjkt.github.io.git


# encrypted

.../Dev/YourKeysYourCrypto

uxWkwj5CXjoGHGdF6BQi0loZMr+MO/A6YXaejdrWSKvzUZmfWXe5xF1xkXt8Ghc1m6dHVyE1jr4dwtoVucxguZ3Tj8ioupsACMsGdFN/xL94b+NAws8gKGW9qLBhNwh+SjLfMOpZ9wLcUwZfoGVZ2Ryk+mKUP70vc4jUn3qpuVvu3C+B5DL/FWKaIp+hgJykXXlmIo6MNSAN60ECaZNKDPymrxfkgBsr5ce5XAvaDIPvAhBRhCicg2WKmAw/UZ49idj054QTt3/gi3OfP7FwpmahWs+d1vpHiI85LuDuF8irZuTCt0gHqMBia0jdS+o++gWoAnzKei3MWWo5Cmw1oBqr5kXUKDJtxnhW4mbkhXkHgnHYizSFP3x/Aft++3EvfxhI7siHpvsk1PrJKxhJLK1XD3VWPSF/eb/aEyHuUYipXI2xMTTkTJQVaEpKRblj

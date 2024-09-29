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

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwSWpvaWMzSnJhbXQwSWl3aWRHOXJaVzRpT2lKbmFIQmZiVlI1Tm1sc1oyazVhalJETlVwVlpHWjFVbFpHVFRoNlJFUlNVbVYyTTFJMFdtZG5JbjAuTlpNa2d5NGp0Q1llZkZyNUhwbWlSc0pVTDAtNnBsbHd1M003ZmtIR0I4RSJ9.U9kZYZY0oGgYHiFxvsciXUg-5TVQ1fYmzVwVLE0So64

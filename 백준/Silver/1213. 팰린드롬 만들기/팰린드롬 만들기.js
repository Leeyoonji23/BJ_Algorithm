// 팰린드롬? 이 뭔지 몰라서 찾아봄..
// 순서를 거꾸로 읽었을 때도 문자열이나 수열이 동일한 경우
// 즉 앞 뒤가 똑같은 대리운전 이 아니라 abba 같이 앞에서 읽을때랑 뒤에서 읽을때랑 모양이 같아야 함.

// 임문빈이 임한수의 영어 이름으로 팰린드롬을 만들려고 함.
// 임한수의 영어 이름을 팰린드롬으로 바꾸는 프로그램. - 임한수의 영어 이름의 알파벳순서를 적절히 바꿔서.
// 입력은 알파벳 대문자로만, 최대 50자
// 만약 불가능일 때는 "I'm Sorry Hansoo" 출력

// 문제 접근
// ABBA, ABCBA, ABCCBA 는 팰린드롬
// AAABBBC->  ABACBAB 는 팰린드롬 안됨.
// -> 홀수 번 나오는 문자가 하나여야 함. 즉, 두 개 이상이면 안됨. or 모두 짝수이거나.

const input = require("fs").readFileSync("/dev/stdin").toString().trim().toUpperCase(); // 입력을 대문자로 변환하여 받음

function createPalindrome(name) {
    const alphabetCount = new Array(26).fill(0);  // 알파벳 빈도수를 저장할 배열

    // 각 알파벳의 등장 횟수를 세어 배열에 저장
    for (let char of name) {
        alphabetCount[char.charCodeAt(0) - 'A'.charCodeAt(0)]++;  // 'A'의 ASCII 값 기준으로 인덱스 계산
    }

    let halfPalindrome = "";  // 팰린드롬 절반을 구성할 문자열
    let oddCharacter = null;  // 홀수 개의 알파벳이 있으면 중간에 위치할 문자

    // 각 알파벳의 등장 횟수를 확인하면서 팰린드롬의 절반을 구성
    for (let i = 0; i < 26; i++) {
        if (alphabetCount[i] % 2 === 1) {  // 홀수 개 등장하는 알파벳이 있는 경우
            if (oddCharacter !== null) {  // 홀수 개 알파벳이 2개 이상일 때는 팰린드롬 불가
                return "I'm Sorry Hansoo";
            }
            oddCharacter = String.fromCharCode('A'.charCodeAt(0) + i);  // 홀수 개 등장 알파벳을 저장
        }

        // 알파벳 등장 횟수의 절반을 이용하여 팰린드롬의 절반을 생성
        halfPalindrome += String.fromCharCode('A'.charCodeAt(0) + i).repeat(alphabetCount[i] / 2);
    }

    // 팰린드롬 완성
    let palindrome = halfPalindrome;  // 절반으로 구성된 팰린드롬 초기화
    if (oddCharacter !== null) {
        palindrome += oddCharacter;  // 홀수 개 등장 알파벳이 있으면 중앙에 추가
    }
    palindrome += halfPalindrome.split("").reverse().join("");  // 절반을 뒤집어 끝에 추가하여 완전한 팰린드롬 생성
    return palindrome;
}

console.log(createPalindrome(input)); // 결과 출력

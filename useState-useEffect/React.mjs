let currentHook = 0; // 현재 훅의 인덱스 저장 변수
let hooks = []; // 훅의 상태를 저장할 배열

// 호출 순서
const useState = (initialValue) => {
  //useState 훅 정의
  hooks[currentHook] = hooks[currentHook] || initialValue; // 현재 훅 인덱스에 초기값 할당
  const hookIndex = currentHook; // 현재 훅 인덱스 저장
  const setState = (newState) => {
    // 상태를 업데이트하는 함수 정의
    if (typeof newState === "function") {
      //만약 newState가 함수라면
      hooks[hookIndex] = newState(hooks[hookIndex]); // 상태를 업데이트
    } else {
      hooks[hookIndex] = newState; //newState를 직접 할당
    }
  };
  return [hooks[currentHook++], setState]; //현재 상태와 상태 업데이트 함수를 반환
};

const useEffect = (callback, depArray) => {
  //useEffect 훅 정의
  const hasNoDeps = !depArray; // 의존성 배열이 없으면 true
  const prevDeps = hooks[currentHook] ? hooks[currentHook].deps : undefined; //이전 의존성 배열 가져오기
  const prevCleanUp = hooks[currentHook] // 이전 clenup함수 가져오기
    ? hooks[currentHook].cleanUp
    : undefined;

  const hasChangedDeps = prevDeps // 의존성이 변경되었는지 확인
    ? !depArray.every((el, i) => el === prevDeps[i])
    : true;

  if (hasNoDeps || hasChangedDeps) {
    //의존성 배열이 없거나 변경된 경우
    if (prevCleanUp) prevCleanUp(); //이전 cleanup함수를 실행
    const cleanUp = callback(); // callback을 실행하여 celanup함수 반환
    hooks[currentHook] = { deps: depArray, cleanUp }; // 현재 훅에 의존성과 cleanup을 저장
  }
  currentHook++; // 다음 훅을 위해 인덱스를 증가
};

const MyReact = {
  //MyReact객체를 정의
  render(Component) {
    // 컴포넌트를 렌더링하는 멘서드
    const instance = Component(); //컴포넌트를 호출하여 인스턴스를 생성
    instance.render(); // 인스턴스의 render메서드를 호출
    currentHook = 0; // 훅 인덱스를 초기화
    return instance; // 인스턴스 반환
  },
};

MyReact.useState = useState; // MyReact객체에 useState를 추가
MyReact.useEffect = useEffect; // MyrReact객체에 useEffect를 추가

export { useState, useEffect }; // useState와 useEffect를 내보내기
export default MyReact; // MyReact객체를 기본 내보내기

import MyReact, { useState, useEffect } from "./React.mjs";

function ExampleComponent() {
  //함수형 컴포넌트 정의
  const [count, setCount] = useState(0);
  const [text, setText] = useState("foo");

  useEffect(() => {
    //useEffect 정의
    console.log("effect", count, text);
    return () => {
      //cleanup함수를 반환하여 component unmount 시 실행
      console.log("cleanup", count, text); //cleanup 시 현재 상태를 로그로 출력
    };
  }, [count, text]); // count와 text변경 시 useEffect 실행

  return {
    click: () => setCount(count + 1),
    type: (text) => setText(text),
    noop: () => setCount(count), // 상태 변경 x
    render: () => console.log("render", { count, text }), //count 와 text의 현재 로그 상태 출력
  };
}

let App = MyReact.render(ExampleComponent); // App 변수에 ExampleComponent를 렌더링하여 저장

App.click(); // click메서드를 호출하여 count 1 증가
App = MyReact.render(ExampleComponent); // 컴포넌트 리렌더링

App.type("bar"); // type메서드 호출하여 text 변경
App = MyReact.render(ExampleComponent); // 컴포런트 리렌더링

App.click(); // click메서드 호출하여 count 1 증가
App = MyReact.render(ExampleComponent); // 컴포런트 리렌더링

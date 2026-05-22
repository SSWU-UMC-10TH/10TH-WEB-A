//useThrottle : 주어진 값(상태)가 자주 변경될떄
//최소 interval(밀리초) 간격으로만 업데이트해서 성능을 개선한다.

import { useState, useRef, useEffect } from "react";

function useThrottle<T>(value: T, delay:number = 500):T{
    //1. 상태 변수 : throttleValue : 최종적으로 쓰로틀링 적용된 값 전달?
    //초기값을 전달받은 value
    const [throttledValue, setThrottledValue] = useState<T>(value);

    //2. RedflastExcepted: 마지막으로 실행된 시간을 기록하는 변수
    //useRef는 사용하면 컴포넌트가 리렌더링 되어도 값이 유지되고, 변경되어도 리렌더링을 트리거하지 않아요
    const lastExecuted = useRef<number>(Date.now())
    const timerRef = useRef<number | null>(null)

    //3. useEffect: value, delay가 변경될때 아래 로직 실행
    useEffect(()=>{
        //현재 시각과 lastExecuted.current에 저장된 마지막 시각 + delay를 비교합니다
        //충분히 시간이 지나면 바로 업데이트
        if(Date.now()>=lastExecuted.current + delay){
            lastExecuted.current = Date.now();
            //최신 value를 throttledValue에 저장해서 컴포넌트 ㄹ ㅣ렌더링
            setThrottledValue(value)
        }else{
            if(timerRef.current !== null) return;
            //충분한 시간이 지나지 않은 경우, delay 시간 후에 업데이트 (최신 value로)
            const timerId : number = setTimeout(()=>{
                //타이머가 완료되면, 마지막 업데이트 시간을 저장해서 컴포넌트 리렌더링
                lastExecuted.current = Date.now();
                setThrottledValue(value);
                timerRef.current = null;
            }, delay)
            timerRef.current = timerId;

            //CleanUp Function 이벤트가 재실행되기 전에 타이머가 실행되지 않았다면
            //기존 타이머를 clearTimeout을 통해 취소하여 중복 업데이트를 방지합니다
            return () => clearTimeout(timerId)
        }
    },[value, delay])

    //최종적으로 잠시 기다린 후의 값을 반환합니다.
    return throttledValue
}

export default useThrottle
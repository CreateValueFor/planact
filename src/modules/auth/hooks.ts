import { LoginProps, logout_api, login_api, signup_api, SignUpProps } from "@/api/auth";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import { AuthActionProps, LOGIN, UserProps } from ".";
import { GlobalState } from ".."

export interface ITokenHeader {
    Authorization: string
}

export const useToken = ():ITokenHeader | null => {
    const user:UserProps|null = useSelector((store:GlobalState) => store.userAuth);
    return user ? {
        Authorization: `Token ${user}`
    } : null;
}

export const useAuthorization = () => {
    const dispatch:Dispatch<AuthActionProps> = useDispatch()
    const user:UserProps|null = useSelector((store:GlobalState) => store.userAuth);
    const logIn = async (props:LoginProps) => {
        if(!props.username){
            Alert.alert("아이디를 입력해주세요.")
            return false;
        }
        if(!props.password){
            Alert.alert("비밀번호를 입력해주세요.")
            return false;
        }

        let message:string = ""
        await login_api(props)
            .then((res:AxiosResponse<UserProps>) => {
                dispatch({
                    type: LOGIN,
                    userData: res.data
                })
            }).catch((err:AxiosError) => {
                message = err.response ? "아이디 / 비밀번호가 잘못되었습니다." : "서버 내부 오류입니다.";
                return;
            })
        if(message){
            Alert.alert(message)
            return false;
        };
        
    }

    const signUp = async (props: SignUpProps) => {
        if(!props.username){
            Alert.alert("아이디를 입력해주세요.")
            return false;
        }
        if(!props.password){
            Alert.alert("비밀번호를 입력해주세요.")
            return false;
        }
        
        let message:string = ""
        if(props.password !== props.password2){
            Alert.alert("비밀번호를 확인해주세요.");
            return;
        }

        await signup_api(props)
            .then((res:AxiosResponse<UserProps>) => {
                dispatch({
                    type: LOGIN,
                    userData: res.data
                })
            }).catch((err:AxiosError) => {
                message = err.response ? "아이디 / 비밀번호가 잘못되었습니다." : "서버 내부 오류입니다.";
                return;
            });
        if(message){
            Alert.alert(message)
            return false;
        };
    }

    const logOut = async (token:ITokenHeader) => {
        let message:string = ""
        await logout_api(token)
            .then((res:AxiosResponse) => {
                return true;
            }).catch((err) => {
                console.log(err.response)
                message = err.response
                return;
            })
        if(message){
            Alert.alert(message)
            return false;
        };
        return true
    }

    return {logIn, signUp, logOut}
}
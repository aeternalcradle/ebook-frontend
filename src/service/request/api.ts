import request from "./index"

//请求中，请求参数和返回数的类型都需要进行约束


export const CaptchaAPI=():Promise<CaptchaAPIRes>=>request.get("/prod-api/captchaImage")


//登录请求
export const LoginAPI=(params:LoginAPIReq):Promise<LoginAPIRes>=>request.post("/prod-api/login",params)

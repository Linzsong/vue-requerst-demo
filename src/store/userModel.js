import ajax from '../axios/index'

const userModel = {
    state: {
        value: 'my value'
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        userModel_userlogin(context, data) {
            return new Promise((resolve, reject) => {
                // console.log(data)
                ajax.usermodel.userLogin(data.data, data.header).then(res=>{
                    if(res.data.code === 200) {
                        resolve(res.data)
                    } else {
                        reject(res.data.message)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        userModel_getDate(context) {
            return new Promise((resolve, reject) => {
                ajax.usermodel.getDate().then(res => {
                    console.log( 'userModel->res:',res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}

export default userModel

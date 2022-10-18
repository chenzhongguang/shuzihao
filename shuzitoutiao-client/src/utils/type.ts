export interface userRegisterI {
    tel1: string;
    password1: string;
    confirmpasswd: string,
}
export interface userLoginI {
    tel: string;
    passwd: string;
}

export interface userId {
    uid: number;
}

export interface creation {
    day: number;
}

export interface usernameI {
    input2: string;
}

export interface attentionI {
    uid: number;
}

export interface commentsI {
    aid: number;
}

export interface articleinfoI {
    aid: number;
}
export interface addtmeId {
    amid: number;
}
export interface articleDataI {
    wid: number;
}

export interface articleI {
    title: string;
    content: string;
    categorys: string;
    mainpic: {
        type: number,
        images: any[],
    }
    status: number;
}

export interface editI {
    aid: number;
    title: string;
    content: string;
    categorys: string;
    mainpic: {
        type: number,
        images: any[],
    }
    status: number;
}

export interface userSet {
    usersinfo:string;
    edi:number;
}
export interface usersSet {

}

export interface avatupload{
    url:string;
}
export interface picSet {

}
export interface picSets {

}
export interface gendSet {

}

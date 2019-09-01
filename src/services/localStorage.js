/*
 * @Description: In User Settings Edit
 * @Author: wangdoudou
 * @Date: 2019-08-28 10:47:09
 * @LastEditTime: 2019-08-28 11:37:26
 * @LastEditors: Please set LastEditors
 */

const ls = localStorage;

/**
 * 获取key对应的value
 */
export function get(key){
    return JSON.parse(ls.getItem(key));
}
    

/**
 *  获取一个list
 */
export function getList(key){
    const before = ls.getItem(key);
    return before ? (JSON.parse(before)) : [];
}

/**
 *  设置对应key的值
 */
export function set(key, value){
    if (!value && value === undefined){
        return; 
    }
    const arr = JSON.stringify(value);
    ls.setItem(key, arr);
}

/**
 *  删除某一项
 * @param localStorage中的key
 */
export function removeItem(key){
    ls.removeItem(ls.getItem(key));
}

/**
 *  清理localStorage
 */
export function clearStorage() {
    ls.clear();
}

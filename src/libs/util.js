import Cookies from 'js-cookie';

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

export const hasOneOf = ( targetarr, arr ) => {
  return arr.some(_ => targetarr.indexOf(_) > -1)
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf( access, item.meta.access)) return true
    else return false
  } else return true
}

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  list.forEach(item => {
    
  })
  return res
}

export const showTitle = () => {
  return "";
}

export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode
  if (parentNode) {
    let classList = parentNode.classList
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode
    } else {
      return findNodeUpperByClasses(parentNode, classes)
    }
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

export const setToken = (token) => {
  Cookies.set('token', token, { expires: 1 })
}

export const getToken = () => {
  const token = Cookies.get('token')
  if (token) return token
  else return false
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

export default {
  get_page_data(data, current_page, page_size) {
    return data.slice((current_page - 1) * page_size, current_page * page_size);
  },
  render_keywords_red(keywords, text) {
    if(!keywords) return text;
    let segments = text.split(keywords);
    let str = "";
    segments.forEach((seg, index) => {
      if (index !== segments.length - 1)
        str += `${seg}<span style='color:red'>${keywords}</span>`;
      else str += seg;
    });
    return str;
  },
  render_multi_keywords_red( keywords, text){
    if(!keywords) return text;
    let keys = keywords.split(/\s/)
    let result = text
    keys.forEach( key => {
      result = this.render_keywords_red( key, result)
    })
    return result;
  },

  format(date) {
    date = new Date(date).toLocaleDateString("ch", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    return date.replace(/\//g, "-");
  },

  format_number(num){
    var result = [], counter = 0;
      num = (num || 0).toString().split('');
      for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result.unshift(num[i]);
      if (!(counter % 3) && i != 0) { result.unshift(','); }
      }
      return result.join('');
  }
}

/**
 * created by Ghan 9.3
 * @todo 设置常用的配置信息并根据环境变量导出
 */

/**
 * @param FETCH_ENTRY -- 统一访问入口
 */
export type InterfaceConfig = {
  FETCH_ENTRY: string;
} & DefaultCommonConfig;

/**
 * @todo 配置不会因为环境改变的数据项
 * @param {DEFAULT_DOCUMENT_TITLE} string 默认head title
 * @param {DEFAULT_FETCH_METHOD} string 默认请求method defalut post
 * @param {DEFAULT_BALL_SPEED} number 购物车小球默认速度 220
 * @param {DEFAUL_MCHNT_CD} string 测试用 mchnt_cd
 * @param {DEFAULT_PICTURE_LING} string 默认图片
 * @param {TAKEAWAYCARTID} string 外卖的 cart id
 * @param {NONEEDLAYOUTEPAGEROUTES} any[] 不需要layout的页面
 * @export
 * @interface DefaultCommonConfig
 */
export interface DefaultCommonConfig {
  DEFAULT_DOCUMENT_TITLE: string;
  DEFAULT_FETCH_METHOD: 'POST' | 'GET' | 'post' | 'get';
  DEFAULT_BALL_SPEED: number;
  DEFAULT_PAGE_SIZE: number;
  DEFAUL_MCHNT_CD: string;
  DEFAULT_PICTURE_LING: string;
  TAKEAWAYCARTID: string;
  STORE_DISH_ORDER_TYPE: string;
  STORE_DISH_CART_TYPE: string;
  DEFAULT_TERMINAL_CD: string;
  DEFAULT_TERMINAL_SN: string;
  STORAGE_USERINFO: string;
}

const defaultCommonConfig: DefaultCommonConfig = {
  DEFAULT_DOCUMENT_TITLE: 'Hey-Beauty',
  DEFAULT_FETCH_METHOD: 'POST',
  DEFAULT_BALL_SPEED: 220,
  DEFAULT_PAGE_SIZE: 200,
  DEFAUL_MCHNT_CD: '60000000200', // 60000000217 60000000200
  DEFAULT_PICTURE_LING: '//net.huanmusic.com/qg/pic_default.png',
  TAKEAWAYCARTID: 'TAKEAWAYCARTID',
  STORE_DISH_ORDER_TYPE: 'order',
  STORE_DISH_CART_TYPE: 'cart',
  DEFAULT_TERMINAL_CD: '00001104D1V0670019908',
  DEFAULT_TERMINAL_SN: 'FB485E065EEEF191EE1E9ED8BA157A0DA65D6EBA812A4D29',
  STORAGE_USERINFO: 'XIAOHONGSHU_USERINFO'
};

// 测试环境 http://202.101.149.132:7680/BKMS_HMS/GateWayAction.do
const devConfig: InterfaceConfig = {
  ...defaultCommonConfig,
  // FETCH_ENTRY: 'http://zhouminghui.natapp1.cc',
  FETCH_ENTRY: 'http://127.0.0.1:8080',
};

const proConfig: InterfaceConfig = {
  ...defaultCommonConfig,
  // FETCH_ENTRY: 'http://zhouminghui.natapp1.cc',
  FETCH_ENTRY: 'http://127.0.0.1:8080',
};

interface ProcessChoiceFilterFunc<T> {
  (arg1: T, arg2: T): T;
}

const processChoiceFilter: ProcessChoiceFilterFunc<InterfaceConfig> = (devConfig, proConfig) => {
  if (process.env.NODE_ENV === 'production') {
    return proConfig;
  } else {
    return devConfig;
  }
};

/**
 * connect 需要用到的merge工具
 * @param stateProps 
 * @param dispatchProps 
 * @param ownProps 
 */
const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

const formatOrderTime = (time: string): string => {
  if (!time || typeof (time) !== 'string' || time.length !== 14) {
    return '非法时间格式';
  }
  const year = time.substr(0, 4);
  const month = time.substr(4, 2);
  const day = time.substr(6, 2);
  const hour = time.substr(8, 2);
  const min = time.substr(10, 2);
  const sec = time.substr(12, 2);

  const formatDate = `${year}-${month}-${day} ${hour}:${min}:${sec}`;

  return formatDate;
};

const isArrayFn = (value: any): boolean => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
};

export { 
  devConfig, 
  proConfig,
  mergeProps,
  formatOrderTime,
  isArrayFn,
};

export default processChoiceFilter(devConfig, proConfig);
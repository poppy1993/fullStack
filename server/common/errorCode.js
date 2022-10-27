const ErrorType = {
  USERNOTEXIST: {
    code: 2002,
    message: '用户不存在'
  },
  PASSWORDNOTCORRECT: {
    code: 2003,
    message: '密码不正确'
  },
  USERNOTLOGIN: {
    code: 2004,
    message: '用户未登录'
  },
  ITEMNOTEXIST: {
    code: 3002,
    message: '商品不存在'
  },
  BANNERNOTEXIST: {
    code: 4002,
    message: 'banner不存在'
  },
  MESSAGENOTEXIST: {
    code: 5002,
    message: '消息不存在'
  }
};

module.exports = ErrorType;
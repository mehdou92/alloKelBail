const publicActions = (provider, actions) =>
  actions.reduce((methods, methodName) => ({ ...methods, [methodName]: provider[methodName] }), {});

export default publicActions;
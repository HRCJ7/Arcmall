
const networkAlert = handleConnectionChange = isConnected => {
    this.setState({ status: isConnected });
    if (!isConnected) {
      return connected;
    }else{
      return notConnected;
    }
  // network conctivity check end here --
}

export default {
  networkAlert
};
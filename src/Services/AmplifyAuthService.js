import {Auth} from 'aws-amplify';

class AmplifyAuthService {

  async currentUserId() {
    const {attributes } = await Auth.currentAuthenticatedUser();
    return await attributes.sub;
  }

}

export default new AmplifyAuthService();
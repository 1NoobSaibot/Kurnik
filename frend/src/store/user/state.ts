export interface UserData {
  id: number,
  name: string,
  accessToken: string,
  refreshToken: string
}

export interface UserStateInterface {
  user?: UserData
}

function state(): UserStateInterface {
  return {
    user: undefined
  }
};

export default state;

declare module NodeJS  { // eslint-disable-line
  interface Global {
    firebaseui: any;
  }

  interface Process {
    client: boolean;
  }
}

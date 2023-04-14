export type Props= {
    about?: {
      photo?: string;
      first_name?: string;
      last_name?: string;
    };
    kins?: object;
    emergency?: object;
    banking?: object;
  }
  export type ProfileDataItem= {
    key: string;
    title: string;
    iconLeft: {
      uri: string;
    };
    data: string[];
    iconRight: {
      uri: string;
    };
  }
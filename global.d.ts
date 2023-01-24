import { Canceler } from "axios";

declare global {
    import Storage from 'react-native-storage'
    var storage : Storage;
    var cancel : Canceler
  }
  
  export {}
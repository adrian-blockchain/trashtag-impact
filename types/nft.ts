export interface NFTData {
  id: number;
  owner: string;
  uri: string;
}

export interface WasteToken{
  info:NFTData
  index:number,
  type: string,
  exploration: boolean,
  wasteLoc:GeolocationPosition,
  wastePict:string,
  trashcanPict:string,
  trashcanLoc: GeolocationPosition
}

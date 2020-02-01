import { DataEncodingInfo } from '../types/dataviz';

export function createDataEncodingInfo(name: string,
                                       type: string,
                                       encoding: string,
                                       description: string): DataEncodingInfo {
  return { name, type, encoding, description };
}

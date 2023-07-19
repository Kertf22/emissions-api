export type MostCommonFontsQueryResponse = {
  font: String;
  total_registros_fonte: Number;
}[]


export type AverageEmissionsQueryResponse = {
  media_emissao: Number;
}[]


declare global {
  namespace Express {
    export interface Request {
      userId?: number;
    }
  }
}
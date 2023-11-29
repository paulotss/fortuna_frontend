import IBranch from "./IBranch";
import ILevel from "./ILevel";

export default interface IUser {
  id?: number;
	name: string;
	code?: string;
	password?: string;
	cellPhone: string;
	email: string;
	branch?: IBranch;
	level?: ILevel;
}
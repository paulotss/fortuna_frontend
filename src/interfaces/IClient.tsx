import IUser from "./IUser";

export default interface IClient extends IUser {
	cpf: string;
	balance: number;
	userId?: number;
}
export class User {
    user_id: number;
    email: string;
    password: string;

    static copy(pattern: User): User {
        const temp = new User();
        temp.email = pattern.email;
        temp.password = pattern.password;
        temp.user_id = pattern.user_id;
        return temp;
    }
}

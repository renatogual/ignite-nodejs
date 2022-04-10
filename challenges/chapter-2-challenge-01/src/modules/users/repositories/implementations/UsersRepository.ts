import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    // Complete aqui
    const user = new User();

    Object.assign(user, {
      name,
      email,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    // Complete aqui
    const findUser = this.users.find((user) => user.id === id);
    return findUser;
  }

  findByEmail(email: string): User | undefined {
    // Complete aqui
    const findUser = this.users.find((user) => user.email === email);
    return findUser;
  }

  turnAdmin(receivedUser: User): User {
    // Complete aqui

    const userUpdated = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };

    const userId = userUpdated?.id;

    const newUsers = this.users.map((user) => {
      if (user.id === userId) {
        return userUpdated;
      }

      return user;
    });

    this.users = newUsers;

    return userUpdated;
  }

  list(): User[] {
    // Complete aqui
    return this.users;
  }
}

export { UsersRepository };

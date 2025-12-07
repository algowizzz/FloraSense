import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (name, email, password) => {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const users = JSON.parse(await AsyncStorage.getItem("users")) || [];

    if (users.some((u) => u.email === cleanEmail)) {
      return { success: false, message: "Email already exists!" };
    }

    const [firstName, ...lastArr] = name.trim().split(" ");
    const lastName = lastArr.join(" ");

    const newUser = {
      firstName,
      lastName,
      email: cleanEmail,
      password: password.trim(),
      gender: "",
      phone: "",
      birthdate: ""
    };

    users.push(newUser);

    await AsyncStorage.setItem("users", JSON.stringify(users));
    await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));

    return { success: true };
  } catch (e) {
    return { success: false, message: "Error registering user" };
  }
};

export const loginUser = async (email, password) => {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const users = JSON.parse(await AsyncStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) => u.email === cleanEmail && u.password === cleanPassword
    );

    if (!existingUser) {
      return { success: false, message: "Invalid email or password!" };
    }

    await AsyncStorage.setItem("currentUser", JSON.stringify(existingUser));

    return { success: true };
  } catch (e) {
    return { success: false, message: "Login failed" };
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await AsyncStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const updateUserProfile = async (updatedUser) => {
  try {
    let users = JSON.parse(await AsyncStorage.getItem("users")) || [];

    users = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );

    await AsyncStorage.setItem("users", JSON.stringify(users));
    await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));

    return { success: true };
  } catch {
    return { success: false, message: "Failed to update profile" };
  }
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("currentUser");
};

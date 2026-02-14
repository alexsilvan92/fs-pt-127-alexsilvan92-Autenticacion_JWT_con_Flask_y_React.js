const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const signupService = async ({ email, password }) => {
    try {
        const response = await fetch(backendUrl + "/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        // Intentar parsear la respuesta aunque sea error
        const data = await response.json();
        if (!response.ok) {
            // Aquí devuelves el mensaje que venga del backend
            return [null, data.description || "Error al registrarse"];
        }
        return [data, null];
    } catch (err) {
        return [null, err.message];
    }
};

export const loginService = async ({ email, password }) => {
    try {
        const response = await fetch(backendUrl + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            return [null, data.description || "Error al iniciar sesion"];
        }
        return [data, null];
    } catch (err) {
        return [null, err.message];
    }
};

export const getMeService = async (token) => {
    try {
        const response = await fetch(backendUrl + "/api/protected", {
            headers: { "Authorization": "Bearer " + token },
        });

        if (!response.ok) {
            return [null, "Token invalido"];
        }

        const data = await response.json();
        return [data, null];
    } catch (err) {
        return [null, err.message];
    }
};

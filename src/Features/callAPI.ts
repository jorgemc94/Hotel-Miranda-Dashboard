
const API_URL= import.meta.env.VITE_API_URL

export async function backendAPI(path: string, method: 'GET', data: any = null) {
    const token = localStorage.getItem('TOKEN_KEY')
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined
        });

        if ([401, 403].includes(response.status)) {
            localStorage.clear();
            location.reload();
            return;
        } else if (!response.ok) {
            throw new Error()
        }

        return await response.json()
    } catch (error) {
        throw(error)
    }
}


export async function login(user: { email: string; password: string }) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to login');
        }
        const data = await response.json();
        localStorage.setItem('TOKEN_KEY', data.Token);
        localStorage.setItem('user', JSON.stringify(data.User));
        return data.User;
    } catch (error) {
        throw error;
    }
}
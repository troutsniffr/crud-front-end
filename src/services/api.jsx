import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:5080';
const surfboardUrl = `${baseUrl}/surfboards`;
const usersUrl = `${baseUrl}/users`;

export const login = async (username, password) => {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
};


//GETS

export const SurfboardApi = () => {
    const [surfboards, setSurfboards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(surfboardUrl, { credentials: 'include' })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch surfboards');
                }
                return res.json();
            })
            .then((data) => {
                setSurfboards(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const fetchSurfboards = () => {
        setLoading(true);
        fetch(surfboardUrl, { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => {
                setSurfboards(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchSurfboards();
    }, []);

    return { surfboards, loading, error, fetchSurfboards };
};

export const UsersApi = () => {

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    setLoading(true);
    fetch(usersUrl, { credentials: 'include' })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch users');
            }
            return res.json();
        })
        .then((data) => {
            setUsers(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        });
}, []);

const fetchUsers = () => {
    setLoading(true);
    fetch(usersUrl, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            setUsers(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        });
};

useEffect(() => {
    fetchUsers();
}, []);

return { users, loading, error, fetchUsers };
};

//Surfboard POSTS

export const addSurfboard = async (surfboardData) => {
    const response = await fetch(surfboardUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(surfboardData),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to add surfboard, you propbably forgot to select a board type');
    return response.json();
};

export const updateSurfboard = async (id, surfboardData) => {
    const response = await fetch(`${surfboardUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(surfboardData),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to edit surfboard');
    return response.json();
};

export const deleteSurfboard = async (id) => {
    const response = await fetch(`${surfboardUrl}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete surfboard');
    return response.json();
};

//User POSTS

export const addUser = async (userData) => {
    const response = await fetch(usersUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to add user, all fields are mandatory');
    return response.json();
};

export const updateUser = async (id, userData) => {
    const response = await fetch(`${usersUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to edit user');
    return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`${usersUrl}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
};
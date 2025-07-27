<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class WargaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query()->where('role', 'warga');

        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        $users = $query->latest()->paginate(10)->withQueryString();


        return Inertia::render('admin/warga/index', [
            'wargas' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|string|size:16|unique:users,nik',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'username' => 'required|string|max:255|unique:users,username'
        ]);

        $validated['password'] = bcrypt($validated['password']);
        $validated['role'] = 'warga';

        User::create($validated);

        return redirect()->back()->with('success', 'User berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */


    public function update(Request $request, User $warga)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($warga->id),
            ],
            'nik' => [
                'nullable',
                'string',
                'size:16',
                Rule::unique('users')->ignore($warga->id),
            ],
            'username' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('users')->ignore($warga->id),
            ],
            'password' => 'nullable|min:8',
        ]);


   

        if (!empty($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $warga->update($validated);

        return redirect()->back()->with('success', 'User berhasil diperbarui.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()->with('success', 'User berhasil dihapus.');
    }
}

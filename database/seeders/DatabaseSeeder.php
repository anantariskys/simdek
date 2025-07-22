<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create superadmin user
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'username' => 'superadmin',
            'role' => 'superadmin',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);

        // Create admin user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'username' => 'admin',
            'role' => 'admin',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);

        // Fix syntax error in PengumumanSeeder call
        $this->call(NewsSeeder::class);
        $this->call(PengumumanSeeder::class);


        // Create sample warga user
        User::factory()->create([
            'name' => 'Warga',
            'username' => 'warga',
            'nik' => '123456789',
            'role' => 'warga',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $users = User::all()->pluck('id')->toArray();
        $categories = ['berita','umkm'];

        for ($i = 0; $i < 25; $i++) {
            $title = $faker->sentence(6);
            $category = $faker->randomElement($categories);
            
            // Generate HTML article content
          
            $articleHtml = '<h1>' . $title . '</h1>';
            
            // Add featured image
            $width = $faker->numberBetween(200, 800);
            $height = $faker->numberBetween(200, 800);
            $articleHtml .= '<figure>';
            $articleHtml .= '<img src="https://picsum.photos/' . $width . '/' . $height . '" alt="' . $title . '">';
            $articleHtml .= '<figcaption>' . $faker->sentence() . '</figcaption>';
            $articleHtml .= '</figure>';

            // Generate article sections with headings and paragraphs
            for ($section = 0; $section < 3; $section++) {
                $articleHtml .= '<h2>' . $faker->sentence(4) . '</h2>';
                $articleHtml .= '<p>' . $faker->paragraph(4) . '</p>';
                
                // Add blockquote in some sections
                if ($faker->boolean(30)) {
                    $articleHtml .= '<blockquote><p>' . $faker->sentence(8) . '</p></blockquote>';
                }
                
                $articleHtml .= '<p>' . $faker->paragraph(5) . '</p>';
            }

            // Add a list sometimes
            if ($faker->boolean(40)) {
                $articleHtml .= '<ul>';
                for ($j = 0; $j < 4; $j++) {
                    $articleHtml .= '<li>' . $faker->sentence() . '</li>';
                }
                $articleHtml .= '</ul>';
            }

            $imgWidth = $faker->numberBetween(200, 800);
            $imgHeight = $faker->numberBetween(200, 800);
            
            News::create([
                'user_id' => $faker->randomElement($users),
                'slug' => Str::slug($title),
                'title' => $title,
                'body' => $articleHtml,
                'url_gambar' => 'https://picsum.photos/' . $imgWidth . '/' . $imgHeight,
                'category' => $category,
                'phone_number' => $category === 'umkm' ? $faker->phoneNumber() : null,
            ]);
        }
    }
}

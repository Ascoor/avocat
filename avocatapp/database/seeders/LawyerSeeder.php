<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\DB;
use App\Models\Lawyer;
use App\Models\User;

class LawyerSeeder extends Seeder
{
    public function run()
    {

        $lawyers = [
            [
                'name' => 'عبدالحميد عسكر',
                'birthdate' => '1980-05-15',
                'identity_number' => '23456745512345',
                'law_reg_num' => '12533',
                'lawyer_class' => 'نقض',
                'email' => 'ahmed@ex.com',
                'phone_number' => '01012345678',
                'gender' => 'ذكر',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],
            [
                'name' => 'وليد نجاح',
                'birthdate' => '1940-05-15',
                'identity_number' => '23456749512345',
                'law_reg_num' => '124344',
                'lawyer_class' => 'نقض',
                'email' => 'mony.ahmed@example.com',
                'phone_number' => '01012845678',
                'gender' => 'أنثى',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],
            [
                'name' => 'أيمن البلتاجي',
                'birthdate' => '1980-05-15',
                'identity_number' => '23456765512345',
                'law_reg_num' => '14234',
                'lawyer_class' => 'نقض',
                'email' => 'sayed.ahojmed@example.com',
                'phone_number' => '01012342678',
                'gender' => 'ذكر',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],

            [
                'name' => 'رشا عبدالنبي',
                'birthdate' => '1980-05-15',
                'identity_number' => '23356765512345',
                'law_reg_num' => '12344',
                'lawyer_class' => 'نقض',
                'email' => 'sayed.allhmed@example.com',
                'phone_number' => '0101e322678',
                'gender' => 'ذكر',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],
            [
                'name' => 'جيهان رشاد',
                'birthdate' => '1980-05-15',
                'identity_number' => '23456765572345',
                'law_reg_num' => '12334',
                'lawyer_class' => 'نقض',
                'email' => 'sayed.addkhmed@example.com',
                'phone_number' => '01012322678',
                'gender' => 'ذكر',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],
            [
                'name' => 'إيمان الطحان',
                'birthdate' => '1980-05-15',
                'identity_number' => '12245454785454',
                'law_reg_num' => '12231134',
                'lawyer_class' => 'نقض',
                'email' => 'sayed.akhdfgmed@example.com',
                'phone_number' => '010100022678',
                'gender' => 'أنثى',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],
            [
                'name' => 'ساره الحلو',
                'birthdate' => '1980-05-15',
                'identity_number' => '12249898785454',
                'law_reg_num' => '12238874',
                'lawyer_class' => 'نقض',
                'email' => 'sayed.akssshmed@example.com',
                'phone_number' => '010122002678',
                'gender' => 'أنثى',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],
            [
                'name' => 'أيه عبد الرازق',
                'birthdate' => '1980-05-15',
                'identity_number' => '12545488785454',
                'law_reg_num' => '12000874',
                'lawyer_class' => 'نقض',
                'email' => 'sayed.akhmdfded@example.com',
                'phone_number' => '010133202678',
                'gender' => 'أنثى',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],
            [
                'name' => 'اسلام عوض',
                'birthdate' => '1980-05-15',
                'identity_number' => '25476765572345',
                'law_reg_num' => '1233334',
                'lawyer_class' => 'نقض',
                'email' => 'sayed.aksfghmed@example.com',
                'phone_number' => '01012122678',
                'gender' => 'ذكر',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],
            [
                'name' => 'خالد الكيلاني',
                'birthdate' => '1980-05-15',
                'identity_number' => '24476765572345',
                'law_reg_num' => '143134',
                'lawyer_class' => 'نقض',
                'email' => 'sayed.aksdshmed@example.com',
                'phone_number' => '010121432678',
                'gender' => 'ذكر',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],
            [
                'name' => 'شريف اسامه',
                'birthdate' => '1980-05-15',
                'identity_number' => '24547765572345',
                'law_reg_num' => '12333335',
                'lawyer_class' => 'نقض',
                'email' => 'sayed.akhmdded@example.com',
                'phone_number' => '01012992678',
                'gender' => 'ذكر',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ],
            [
                'name' => 'حسام الرفاعي',
                'birthdate' => '1980-05-15',
                'identity_number' => '32347765572345',
                'law_reg_num' => '123337675',
                'lawyer_class' => 'نقض',
                'email' => 'sayed.akfdhmed@example.com',
                'phone_number' => '010132342678',
                'gender' => 'ذكر',
                'address' => 'القاهرة',
                'religion' => 'مسلم',
            ]
        ];

        foreach ($lawyers as $lawyerData) {
            DB::transaction(function () use ($lawyerData) {

                // 1) User: نفس المستخدم لو موجود (بالـ email)
                $user = User::updateOrCreate(
                    ['email' => $lawyerData['email']],
                    [
                        'name' => $lawyerData['name'],
                        'password' => Hash::make('Ask@12345'),
                        'role' => '2', // lawyer
                    ]
                );

                // 2) Lawyer: نفس المحامي لو موجود (بالـ identity_number)
                Lawyer::updateOrCreate(
                    ['identity_number' => $lawyerData['identity_number']],
                    [
                        'name' => $lawyerData['name'],
                        'birthdate' => $lawyerData['birthdate'],
                        'law_reg_num' => $lawyerData['law_reg_num'],
                        'lawyer_class' => $lawyerData['lawyer_class'],
                        'email' => $lawyerData['email'],
                        'phone_number' => $lawyerData['phone_number'],
                        'gender' => $lawyerData['gender'],
                        'address' => $lawyerData['address'] ?? null,
                        'religion' => $lawyerData['religion'],
                        'user_id' => $user->id,
                    ]
                );

                // 3) Token (اختياري للاختبار فقط)
                // مهم: Passport لازم يكون متثبت بـ passport:install
                // لو مش محتاج توكنات أثناء seed، سيب السطور دي معلّقة
                // $token = $user->createToken('seed-token')->accessToken;
                // dump($user->email, $token);
            });
        }
    }
}
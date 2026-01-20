<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\TokenRepository;
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

        $clientRepository = app(ClientRepository::class);
        $tokenRepository = app(TokenRepository::class);

        foreach ($lawyers as $lawyerData) {
            DB::beginTransaction();
            try {
                // Create a user for the lawyer
                $user = new User([
                    'name' => $lawyerData['name'],
                    'email' => $lawyerData['email'],
                    'password' => Hash::make('Ask@12345'), // Set a default password
                    'role' => '2', // Set the role to '2' for lawyers
                ]);
                $user->save();

                // Create a Passport client for the lawyer
                $client = $clientRepository->createPersonalAccessClient(
                    $user->id,
                    $user->name,
                    ''
                );

                // Create a new personal access token for the lawyer
                $token = $user->createToken($user->name);

                // Store the client ID and secret in the user model
                $user->client_id = $client->id;
                $user->client_secret = $client->secret;
                $user->save();

                // Create a lawyer with the associated user_id
                $lawyer = new Lawyer([
                    'name' => $lawyerData['name'],
                    'birthdate' => $lawyerData['birthdate'],
                    'identity_number' => $lawyerData['identity_number'],
                    'law_reg_num' => $lawyerData['law_reg_num'],
                    'email' => $lawyerData['email'],
                    'gender' => $lawyerData['gender'],
                    'religion' => $lawyerData['religion'],
                    'phone_number' => $lawyerData['phone_number'],
                    'lawyer_class' => $lawyerData['lawyer_class'],
                    'user_id' => $user->id, // Associate the user_id with the lawyer
                ]);
                $lawyer->save();

                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
                throw $e;
            }
        }
    }
}

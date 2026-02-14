<?php

namespace App\Http\Controllers;

use App\Models\Lawyer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LawyerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    return Lawyer::select('id', 'name', 'birthdate', 'identity_number', 'law_reg_num', 'lawyer_class', 'email', 'phone_number', 'gender', 'address', 'user_id','religion')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    // Validate lawyer data
    $validatedData = $request->validate([
    'name' => 'required',
    'birthdate' => 'required|date',
    'identity_number' => 'required|unique:lawyers',
    'law_reg_num' => 'required|unique:lawyers',
    'email' => 'required|unique:lawyers',
    'gender' => 'required',
    'religion' => 'required',
    'phone_number' => 'required',
    'lawyer_class' => 'required|in:نقض, إستئناف,إبتدائي,جدول عام',
    'password' => 'sometimes|required', // Add password validation
    ]);
  // Create the user
  $user = new User();
  $user->name = $validatedData['name'];
  $user->email = $validatedData['email'];
  $user->password = Hash::make($request->password); // Hash the password
  $user->role = '2'; // Set the role to '2' for lawyers
  $user->save();

  // Create the lawyer with the associated user_id
  $lawyer = new Lawyer();
  $lawyer->name = $validatedData['name'];
  $lawyer->birthdate = $validatedData['birthdate'];
  $lawyer->identity_number = $validatedData['identity_number'];
  $lawyer->law_reg_num = $validatedData['law_reg_num'];
  $lawyer->email = $validatedData['email'];
  $lawyer->gender = $validatedData['gender'];
  $lawyer->religion = $validatedData['religion'];
  $lawyer->phone_number = $validatedData['phone_number'];
  $lawyer->lawyer_class = $validatedData['lawyer_class'];
  $lawyer->user_id = $user->id; // Associate the user_id with the lawyer
  $lawyer->save();

  // Generate an access token for the newly registered lawyer
  $token = $user->createToken('Lawyer Token')->accessToken;

  return response()->json([
      'message' => 'Lawyer added successfully',
      'token' => $token, // Include the generated token in the response
  ]);
}
    public function show(Lawyer $lawyer)
    {
    return response()->json([
        'lawyer' => $lawyer,
    ]);
    }


    public function update(Request $request, $id)
    {
    // Find the lawyer you want to update
    $lawyer = Lawyer::findOrFail($id);

    // Validate lawyer data (you can modify these validation rules as needed)
    $validatedData = $request->validate([
        'name' => 'required',
        'birthdate' => 'required|date',
        'identity_number' => 'required|unique:lawyers,identity_number,' . $lawyer->id,
        'law_reg_num' => 'required|unique:lawyers,law_reg_num,' . $lawyer->id,
        'email' => 'required|unique:lawyers,email,' . $lawyer->id,
        'gender' => 'required',
        'religion' => 'required',
        'phone_number' => 'required',
        'lawyer_class' => 'required|in:نقض, إستئناف,إبتدائي,جدول عام',
        'password' => 'sometimes|required', // Add password validation if needed
    ]);

    // Update the user associated with the lawyer
    $user = User::findOrFail($lawyer->user_id);
    $user->name = $validatedData['name'];
    $user->email = $validatedData['email'];
    $user->password = Hash::make($request->password); // Hash the password if needed
    $user->save();

    // Update the lawyer
    $lawyer->name = $validatedData['name'];
    $lawyer->birthdate = $validatedData['birthdate'];
    $lawyer->identity_number = $validatedData['identity_number'];
    $lawyer->law_reg_num = $validatedData['law_reg_num'];
    $lawyer->email = $validatedData['email'];
    $lawyer->gender = $validatedData['gender'];
    $lawyer->religion = $validatedData['religion'];
    $lawyer->phone_number = $validatedData['phone_number'];
    $lawyer->lawyer_class = $validatedData['lawyer_class'];
    $lawyer->save();

    return response()->json([
        'message' => 'Lawyer updated successfully',
    ]);
    }

    public function destroy($id)
    {
        $lawyer = Lawyer::findOrFail($id);
    $lawyer->delete();

    return response()->json([
        'message' => 'Lawyer deleted successfully',
    ]);
    }
}

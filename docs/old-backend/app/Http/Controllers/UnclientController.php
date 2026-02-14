<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Unclient;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UnclientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
 public function index()
 {
     $unclients = Unclient::all();
     return response()->json( ['unclients'  =>  $unclients]);
 }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
     public function store(Request $request)
     {
         $validatedData = $request->validate([
             'slug' => 'required|unique:unclients|max:255',
             'name' => 'required|max:255',
             'email' => 'nullable|unique:unclients|email|max:255',
             'phone_number' => 'required|max:255',
             'address' => 'nullable|max:255',
             'work' => 'nullable|max:255',
             'emergency_number' => 'nullable|max:255',
             'date_of_birth' => 'required|date',
             'gender' => 'nullable|in:ذكر,أنثى',
             'religion' => 'nullable|in:مسلم,مسيحي',
             'identity_number' => 'required|unique:unclients|max:14',
         ]);
 
         $unclient = Unclient::create($validatedData);
         return response()->json($unclient, 201);
     }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Unclient  $unclient
     * @return \Illuminate\Http\Response
     */

 
     // Show a single unclient
     public function show($id)
     {
         $unclient = Unclient::find($id);
 
         if (!$unclient) {
             return response()->json(['message' => 'Not Found!'], 404);
         }
 
         return response()->json($unclient);
     }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Unclient  $unclient
     * @return \Illuminate\Http\Response
     */
    
     // Update an existing unclient
     public function update(Request $request, $id)
     {
         $unclient = Unclient::find($id);
 
         if (!$unclient) {
             return response()->json(['message' => 'Not Found!'], 404);
         }
 
         $validatedData = $request->validate([
             'slug' => 'required|max:255|unique:unclients,slug,' . $id,
             'name' => 'required|max:255',
             'email' => 'nullable|email|max:255|unique:unclients,email,' . $id,
             'phone_number' => 'required|max:255',
             'address' => 'nullable|max:255',
             'work' => 'nullable|max:255',
             'emergency_number' => 'nullable|max:255',
             'date_of_birth' => 'required|date',
             'gender' => 'nullable|in:ذكر,أنثى',
             'religion' => 'nullable|in:مسلم,مسيحي',
             'identity_number' => 'required|max:14|unique:unclients,identity_number,' . $id,
         ]);
 
         $unclient->update($validatedData);
         return response()->json($unclient);
     }
    /**
     * Search for unclient by name or phone number
     *
     * @param  \App\Models\Unclient  $unclient
     * @return \Illuminate\Http\Response
     */

     public function getUnclientSearch(Request $request)
     {
        try {
            $searchQuery = $request->input('search');
         $filteredUnclients = Unclient::where('slug', 'like', '%' . $searchQuery . '%')
         ->orWhere('name', 'like', '%' . $searchQuery . '%')
         ->orWhere('phone_number', 'like', '%' . $searchQuery . '%')
         ->orWhere('identity_number', 'like', '%' . $searchQuery . '%')     
         ->get();

     return response()->json($filteredUnclients, 200);
 } catch (\Exception $e) {
     return response()->json(['error' => 'An error occurred while searching leg cases'], 500);
 }
}







    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Unclient  $unclient
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $unclient = Unclient::find($id);

        if (!$unclient) {
            return response()->json(['message' => 'Not Found!'], 404);
        }

        $unclient->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}

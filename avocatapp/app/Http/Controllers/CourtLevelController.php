<?php

namespace App\Http\Controllers;

use App\Models\CourtLevel;
use App\Models\CourtSubType;
use Illuminate\Http\Request;

class CourtLevelController extends Controller
{
     /**
      * Display a listing of the resource.
      *
      * @return \Illuminate\Http\Response
      */
     public function index()
     {
         $courtLevels = CourtLevel::all();

         return response()->json($courtLevels);
     }

     /**
      * Store a newly created resource in storage.
      *
      * @return \Illuminate\Http\JsonResponse
      */
     public function store(Request $request)
     {
         $request->validate([
             'name' => 'required',
         ]);

         $courtLevel = CourtLevel::create($request->all());

         return response()->json($courtLevel, 201);
     }

     /**
      * Display the specified resource.
      *
      * @return \Illuminate\Http\JsonResponse
      */
     public function show(CourtLevel $courtLevel)
     {
         return response()->json($courtLevel);
     }

     /**
      * Update the specified resource in storage.
      *
      * @return \Illuminate\Http\JsonResponse
      */
     public function update(Request $request, CourtLevel $courtLevel)
     {
         $request->validate([
             'name' => 'required',
         ]);

         $courtLevel->update($request->all());

         return response()->json($courtLevel, 200);
     }

     /**
      * Remove the specified resource from storage.
      *
      * @return \Illuminate\Http\JsonResponse
      */

      public function destroy($id)
      {

              // Find the Court model by ID
              $court_level = CourtLevel::findOrFail($id);

              // Delete the Court
              $court_level->delete();

              return response()->json(['message' => 'Court deleted']);
          }

  }

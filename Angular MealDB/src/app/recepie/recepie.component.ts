import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recepie',
  templateUrl: './recepie.component.html',
  styleUrls: ['./recepie.component.css']
})
export class RecepieComponent implements OnInit {

  recepieDetails:{ name: String, img: String, steps: String, yt: String }[]=[]
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
      this.http.get <any>(history.state.link) 
    .subscribe (data => {
      const recepie={
        name : data.meals[0].strMeal,
        img : data.meals[0].strMealThumb,
        steps : data.meals[0].strInstructions,
        yt : data.meals[0].strYoutube
      }
      this.recepieDetails.push(recepie)
      console.log(recepie)
    })
  }

  logout(){
    localStorage.setItem("key","no-access")
    this.router.navigateByUrl('/login');
  }

}

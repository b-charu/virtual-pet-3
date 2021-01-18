class Food
{
    constructor()
    {
        this.foodStock = 0;
        this.lastFeed;
        this.image = loadImage("Milk.png");
    }
    updateFoodStock(food1)
    {
        this.foodStock = food1;
    }
    getFeedTime(lfeed)
    {
        this.lastFeed = lfeed;
    }
    deductFood()
    {
        if(this.foodStock >0)
        {
        this.foodStock = this.foodStock-1;
        }
    }

    getFoodStock()
    {
    return this.foodStock;
    }
    display()
    {
        background(46,139,87);

        fill(255,255,254);
        textSize(15);
        if(this.lastFeed>=12){
            text("Last Feed : "+ this.lastFeed%12 + " PM", 50,30);
        }else if(this.lastFeed==0){
            text("Last Feed : 12 AM",50,30);
        }else{
            text("Last Feed : "+ this.lastFeed + " AM", 50,30);
        }

        var x=70,y=100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if(this.foodStock!=0)
        {
            for(var i=0;i<this.foodStock;i++)
            {
                if(i%10==0)
                {
                    x=70;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
            }
        }
      }

      bedroom()
      {
          background(bedroom,500,500);
      }

      garden()
      {
          background(garden,500,500);
      }

      washroom()
      {
          background(washroom,500,500);
      }
    }

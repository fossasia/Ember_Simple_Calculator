class A {
    String name ;
    int number ;
    int age;
     public void set_name(String n){
         name =n;
     }
     public void set_number(int s){
         number=s;
     }
      public String  get_name(){
         return name;
     }
     public int get_number(){
         return number;
     }
  public A(String s1,int num,int age ) {
       name=s1;
       number=num;
       this->age=age;
   }   
  
  
  };
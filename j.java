class A {
    String name ;
    int number ;
    int id_no;
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
  public A(String s1,int num,int id_no) {
       name=s1;
       number=num;
       this->id_no= id_no;
   }   
  
  
  };
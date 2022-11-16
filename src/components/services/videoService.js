import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://udaxedsffpyvaobrsuzw.supabase.co";
const PUBLIC_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkYXhlZHNmZnB5dmFvYnJzdXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzM0NzAsImV4cCI6MTk4Mzc0OTQ3MH0.QMXpA2znDgozrTetO9EhddlOejMVflJ3S-8M0C9XIXM";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
return{
    getAllVideos(){
        return supabase.from("video")
        .select("*");
   
    }
}
}
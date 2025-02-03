import { Suspense } from "react";
import Link from "next/link";
import ListUser from '@/components/ListUser';

export default function Home() {
  return (   
	<div className="w-screen py-20 flex justify-center flex-col items-center">
		<div className="flex items-center justify-between gap-1 mb-5">
			<h1 className="text-4xl font-bold">Next.js 14 CRUD (Create Read Update and Delete) with PHP MySQL</h1>
		</div>    
		<div className="overflow-x-auto">
			<div className="mb-2 w-full text-right">				
				<Link
				href="/users/create"
				className="btn btn-primary">
				Add New User
				</Link>								
			</div>	
			<Suspense fallback="Loading...">
				<ListUser/>
			</Suspense>		
		</div>  
  	</div>  
  );
}

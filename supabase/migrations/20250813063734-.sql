-- Fix security issue: Remove overly permissive system status policy
DROP POLICY IF EXISTS "Users can view system status" ON public.system_status;

-- Create more secure policy for system status viewing
CREATE POLICY "Authenticated users can view system status" 
ON public.system_status 
FOR SELECT 
TO authenticated
USING (true);

-- Update the existing policy to be more specific for modifications
DROP POLICY IF EXISTS "Only authenticated users can modify system status" ON public.system_status;

CREATE POLICY "Authenticated users can insert system status" 
ON public.system_status 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update system status" 
ON public.system_status 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete system status" 
ON public.system_status 
FOR DELETE 
TO authenticated
USING (true);